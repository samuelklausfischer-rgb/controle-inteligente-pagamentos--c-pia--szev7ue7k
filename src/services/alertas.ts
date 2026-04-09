import { supabase } from '@/lib/supabase/client'
import { mockAlertas } from '@/lib/mock-data'

function isMock() {
  return (
    import.meta.env.VITE_SUPABASE_URL === 'https://mock-project.supabase.co' ||
    !import.meta.env.VITE_SUPABASE_URL
  )
}

const mapAlerta = (a: any) => ({
  ...a,
  expand: {
    pagamento_id: a.pagamentos,
  },
})

export const getAlertas = async () => {
  if (isMock()) return mockAlertas.map(mapAlerta)

  const { data, error } = await supabase.from('alertas').select('*, pagamentos(*)')
  if (error) {
    console.error('Supabase error:', error)
    return mockAlertas.map(mapAlerta)
  }
  return data.map(mapAlerta)
}

export const getAlerta = async (id: string) => {
  if (isMock()) {
    const found = mockAlertas.find((a) => a.id === id)
    return found ? mapAlerta(found) : null
  }

  const { data, error } = await supabase
    .from('alertas')
    .select('*, pagamentos(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return mapAlerta(data)
}

export const updateAlerta = async (id: string, data: any) => {
  if (isMock()) return { ...data, id }
  const { data: result, error } = await supabase
    .from('alertas')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return result
}
