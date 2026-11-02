import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

function patchCookieHeaders(response: Response): Response {
  const cookies = response.headers.getSetCookie ? response.headers.getSetCookie() : []
  if (!cookies || cookies.length === 0) {
    return response
  }
  const newHeaders = new Headers(response.headers)
  newHeaders.delete('set-cookie')
  for (const cookie of cookies) {
    let patched = cookie.replace(/;\s*Secure=true/i, '; Secure')
    if (!patched.toLowerCase().includes('samesite=none')) {
      patched = patched.replace(/;\s*SameSite=(Lax|Strict)/i, '; SameSite=None')
      if (!patched.toLowerCase().includes('samesite=')) {
        patched += '; SameSite=None'
      }
    }
    if (!patched.toLowerCase().includes('secure')) {
      patched += '; Secure'
    }
    if (!patched.toLowerCase().includes('partitioned')) {
      patched += '; Partitioned'
    }
    newHeaders.append('Set-Cookie', patched)
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  })
}

const defaultGet = REST_GET(config)
const defaultPost = REST_POST(config)
const defaultDelete = REST_DELETE(config)
const defaultPatch = REST_PATCH(config)
const defaultPut = REST_PUT(config)

export const GET = async (req: Request, context: any) => {
  const res = await defaultGet(req, context)
  return patchCookieHeaders(res)
}

export const POST = async (req: Request, context: any) => {
  const res = await defaultPost(req, context)
  return patchCookieHeaders(res)
}

export const DELETE = async (req: Request, context: any) => {
  const res = await defaultDelete(req, context)
  return patchCookieHeaders(res)
}

export const PATCH = async (req: Request, context: any) => {
  const res = await defaultPatch(req, context)
  return patchCookieHeaders(res)
}

export const PUT = async (req: Request, context: any) => {
  const res = await defaultPut(req, context)
  return patchCookieHeaders(res)
}

export const OPTIONS = REST_OPTIONS(config)
