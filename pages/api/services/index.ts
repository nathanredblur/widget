import { EXT_API_URL } from '@src/utils/const';
import { Service } from '@src/interfaces';
import { NextApiRequest, NextApiResponse } from 'next'
import stripHtml from "string-strip-html";

const serviceParser = (services: any[], categories: { [code: string]: string }) => {
  return services.map(({ code, title, teaser, description, category_codes }) => {
    return {
      code,
      title,
      teaser: stripHtml(teaser || '').result,
      description: stripHtml(description || '').result,
      categoryCodes: category_codes.map((cc: string) => categories[cc]),
      included: category_codes.includes('sb-included'),
    } as Service
  })
}

const categoryParser = (categories: any[]) => {
  return categories.reduce((categoryMap, { code, title }) => {
    categoryMap[code] = title;
    return categoryMap;
  }, {})
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { metadata, services } = await fetch(EXT_API_URL)
      .then(response => response.json())
      .then(data => data.data.servicesData);

    const categories = categoryParser(metadata.categories)
    const servicesData = serviceParser(services, categories)

    res.status(200).json(servicesData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
