import { Memo } from '@/types/memo'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const supabaseUtils = {
  // 모든 메모 가져오기
  getMemos: async (): Promise<Memo[]> => {
    try {
      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading memos from Supabase:', error)
        return []
      }

      // Supabase의 데이터를 Memo 인터페이스에 맞게 변환
      return data?.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        createdAt: item.created_at,
        updatedAt: item.updated_at
      })) || []
    } catch (error) {
      console.error('Error loading memos from Supabase:', error)
      return []
    }
  },

  // 메모 추가
  addMemo: async (memo: Memo): Promise<Memo | null> => {
    try {
      const { data, error } = await supabase
        .from('memos')
        .insert({
          id: memo.id,
          title: memo.title,
          content: memo.content,
          category: memo.category,
          tags: memo.tags,
          created_at: memo.createdAt,
          updated_at: memo.updatedAt
        })
        .select()
        .single()

      if (error) {
        console.error('Error adding memo to Supabase:', error)
        return null
      }

      // 응답 데이터를 Memo 인터페이스에 맞게 변환
      return {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error adding memo to Supabase:', error)
      return null
    }
  },

  // 메모 업데이트
  updateMemo: async (updatedMemo: Memo): Promise<Memo | null> => {
    try {
      const { data, error } = await supabase
        .from('memos')
        .update({
          title: updatedMemo.title,
          content: updatedMemo.content,
          category: updatedMemo.category,
          tags: updatedMemo.tags,
          updated_at: updatedMemo.updatedAt
        })
        .eq('id', updatedMemo.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating memo in Supabase:', error)
        return null
      }

      // 응답 데이터를 Memo 인터페이스에 맞게 변환
      return {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error updating memo in Supabase:', error)
      return null
    }
  },

  // 메모 삭제
  deleteMemo: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('memos')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting memo from Supabase:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting memo from Supabase:', error)
      return false
    }
  },

  // 메모 검색
  searchMemos: async (query: string): Promise<Memo[]> => {
    try {
      const lowerQuery = query.toLowerCase()
      
      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .or(`title.ilike.%${lowerQuery}%,content.ilike.%${lowerQuery}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching memos in Supabase:', error)
        return []
      }

      // 응답 데이터를 Memo 인터페이스에 맞게 변환하고 태그 검색도 클라이언트에서 처리
      const memos = data?.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        createdAt: item.created_at,
        updatedAt: item.updated_at
      })) || []

      // 태그 검색을 클라이언트에서 추가로 필터링
      return memos.filter(memo => 
        memo.title.toLowerCase().includes(lowerQuery) ||
        memo.content.toLowerCase().includes(lowerQuery) ||
        memo.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
      )
    } catch (error) {
      console.error('Error searching memos in Supabase:', error)
      return []
    }
  },

  // 카테고리별 메모 필터링
  getMemosByCategory: async (category: string): Promise<Memo[]> => {
    try {
      if (category === 'all') {
        return await supabaseUtils.getMemos()
      }

      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error filtering memos by category in Supabase:', error)
        return []
      }

      // 응답 데이터를 Memo 인터페이스에 맞게 변환
      return data?.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        createdAt: item.created_at,
        updatedAt: item.updated_at
      })) || []
    } catch (error) {
      console.error('Error filtering memos by category in Supabase:', error)
      return []
    }
  },

  // 특정 메모 가져오기
  getMemoById: async (id: string): Promise<Memo | null> => {
    try {
      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error getting memo by id from Supabase:', error)
        return null
      }

      // 응답 데이터를 Memo 인터페이스에 맞게 변환
      return {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error getting memo by id from Supabase:', error)
      return null
    }
  },

  // 모든 메모 삭제
  clearMemos: async (): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('memos')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // 모든 행 삭제

      if (error) {
        console.error('Error clearing memos from Supabase:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error clearing memos from Supabase:', error)
      return false
    }
  },
}