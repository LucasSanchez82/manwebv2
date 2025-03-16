'use server'

import { phenixScanResponseSchema } from '@/lib/actions/external/phenixscan/phenixscan.schema'
import { sanityzeMangadexResponse } from '@/lib/actions/external/phenixscan/phenixscan.sanityze'
import { type ContentSchemaFromProvider } from '@/lib/schemas/contents/contentSchema'

export const getContentsFromPhenixScanAction = async (
  title: string,
  _: number = 5
): Promise<ContentSchemaFromProvider[]> => {
  const opt = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `action=ts_ac_do_search&ts_ac_query=${title}`,
    method: 'POST',
  }

  const endpoint = `https://phenixscans.fr/wp-admin/admin-ajax.php`
  const response = await fetch(endpoint, opt)
  const contentResult = phenixScanResponseSchema.parse(await response.json())
  return sanityzeMangadexResponse(contentResult)
}
