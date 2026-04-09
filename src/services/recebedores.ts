import { supabase } from '@/lib/supabase/client'
import { mockRecebedores } from '@/lib/mock-data'

function isMock() {
  return (
    import.meta.env.VITE_SUPABASE_URL === 'https://mock-project.supabase.co' ||
    !import.meta.env.VITE_SUPABASE_URL
  )
}

export const getRecebedores = async () => {
  if (isMock()) return mockRecebedores

  const { data, error } = await supabase.from('recebedores').select('*')
  if (error) {
    console.error('Supabase error:', error)
    return mockRecebedores
  }
  return data
}

export const getRecebedor = async (id: string) => {
  if (isMock()) return mockRecebedores.find((r) => r.id === id)

  const { data, error } = await supabase.from('recebedores').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export const createRecebedor = async (data: any) => {
  if (isMock()) return { ...data, id: 'new-id' }
  const { data: result, error } = await supabase.from('recebedores').insert(data).select().single()
  if (error) throw error
  return result
}

export const updateRecebedor = async (id: string, data: any) => {
  if (isMock()) return { ...data, id }
  const { data: result, error } = await supabase
    .from('recebedores')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return result
}

export const deleteRecebedor = async (id: string) => {
  if (isMock()) return true
  const { error } = await supabase.from('recebedores').delete().eq('id', id)
  if (error) throw error
  return true
}
