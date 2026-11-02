import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, type, shortlist, nearestShowroom } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required fields.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })
    const enquiryData: any = {
      name,
      phone,
      email: email || '',
      message: message || '',
      type: type || 'general',
      nearestShowroom: nearestShowroom || '',
      status: 'new',
    }
    if (shortlist) {
      enquiryData.shortlist = shortlist
    }

    const enquiry = await payload.create({
      collection: 'enquiries',
      data: enquiryData,
    })

    return NextResponse.json({
      success: true,
      id: `REF-${enquiry.id}`,
      message: 'Enquiry received. Our representative will contact you within 24 hours.',
    })
  } catch (error: any) {
    console.error('Error creating enquiry:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
