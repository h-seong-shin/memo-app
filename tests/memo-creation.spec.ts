import { test, expect } from '@playwright/test';

test('새 메모 작성', async ({ page }) => {
  await page.goto('/');

  // 1. '새 메모' 버튼 클릭
  await page.getByRole('button', { name: '새 메모' }).click();

  // 2. 메모 작성 폼(모달)이 나타나는지 확인 (제목 기준)
  const form = page.locator('div.fixed.inset-0'); // 모달의 기본 컨테이너
  await expect(form).toBeVisible();
  await expect(form.getByRole('heading', { name: '새 메모 작성' })).toBeVisible();

  // 3. 제목 입력
  await form.getByPlaceholder('메모 제목을 입력하세요').fill('새 테스트 메모');

  // 4. 내용 입력 (MDEditor)
  await form.locator('.w-md-editor-text-input').fill('이것은 E2E 테스트를 위한 새 메모입니다.');

  // 5. 카테고리 선택
  await form.locator('select#category').selectOption({ label: '업무' });

  // 6. 태그 입력 (하나씩 추가)
  const tagInput = form.getByPlaceholder('태그를 입력하고 Enter를 누르세요');
  await tagInput.fill('E2E');
  await tagInput.press('Enter');
  await tagInput.fill('테스트');
  await tagInput.press('Enter');
  
  await expect(form.getByText('#E2E')).toBeVisible();
  await expect(form.getByText('#테스트')).toBeVisible();

  // 7. '저장하기' 버튼 클릭
  await form.getByRole('button', { name: '저장하기' }).click();

  // 8. 폼(모달)이 닫혔는지 확인
  await expect(form).not.toBeVisible();

  // 9. 새 메모 확인 - waitForSelector 추가 및 선택자 수정
  const newMemoSelector = 'div:has-text("새 테스트 메모")';
  await page.waitForSelector(newMemoSelector, { timeout: 10000 }); // 10초 대기

  const newMemo = page.locator(newMemoSelector).first();
  await expect(newMemo).toBeVisible();
  await expect(newMemo).toContainText('이것은 E2E 테스트를 위한 새 메모입니다.');
  await expect(newMemo).toContainText('업무');
  await expect(newMemo).toContainText('#E2E');
  await expect(newMemo).toContainText('#테스트');
});
