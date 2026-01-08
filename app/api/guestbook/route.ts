import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('GET /api/guestbook - Starting request')
    const supabase = getSupabase()
    console.log('Supabase client initialized successfully')
    
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to fetch messages', details: error.message },
        { status: 500 }
      )
    }

    console.log('GET /api/guestbook - Success, returning', data?.length || 0, 'messages')
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/guestbook - Starting request')
    const supabase = getSupabase()
    console.log('Supabase client initialized successfully')
    
    const body = await request.json()
    console.log('Request body:', body)
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    const insertData = {
      name: name.trim(),
      message: message.trim(),
    }
    console.log('Inserting data:', insertData)

    const { data, error } = await supabase
      .from('guestbook')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to create message', details: error.message },
        { status: 500 }
      )
    }

    console.log('POST /api/guestbook - Success, created message:', data)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
