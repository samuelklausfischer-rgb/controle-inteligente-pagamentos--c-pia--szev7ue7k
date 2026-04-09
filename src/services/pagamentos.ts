import { supabase } from '@/lib/supabase/client'
import { mockPagamentos } from '@/lib/mock-data'

function isMock() {
  return (
    import.meta.env.VITE_SUPABASE_URL === 'https://mock-project.supabase.co' ||
    !import.meta.env.VITE_SUPABASE_URL
  )
}

const mapPagamento = (p: any) => ({
  ...p,
  expand: {
    recebedor_id: p.recebedores,
    criado_por: p.profiles,
  },
})

export const getPagamentos = async () => {
  if (isMock()) return mockPagamentos.map(mapPagamento)

  const { data, error } = await supabase.from('pagamentos').select('*, recebedores(*), profiles(*)')

  if (error) {
    console.error('Supabase error:', error)
    return mockPagamentos.map(mapPagamento)
  }
  return data.map(mapPagamento)
}

export const getPagamento = async (id: string) => {
  if (isMock()) {
    const found = mockPagamentos.find((p) => p.id === id)
    return found ? mapPagamento(found) : null
  }

  const { data, error } = await supabase
    .from('pagamentos')
    .select('*, recebedores(*), profiles(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return mapPagamento(data)
}

export const createPagamento = async (data: any) => {
  if (isMock()) return { ...data, id: 'new-id' }

  const { data: result, error } = await supabase.from('pagamentos').insert(data).select().single()

  if (error) throw error
  return result
}

export const updatePagamento = async (id: string, data: any) => {
  if (isMock()) return { ...data, id }

  const { data: result, error } = await supabase
    .from('pagamentos')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return result
}

export const deletePagamento = async (id: string) => {
  if (isMock()) return true

  const { error } = await supabase.from('pagamentos').delete().eq('id', id)

  if (error) throw error
  return true
}
