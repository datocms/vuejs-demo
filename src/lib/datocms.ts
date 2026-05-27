import axios from 'axios'

export async function request(
  { query, variables, preview }: 
  { query: string, variables: Record<string, any>, preview: boolean }
) {
  if (preview) {
    throw new Error('Preview requests require a server-gated draft flow.')
  }

  const endpoint = `https://graphql.datocms.com/`

  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables
    },
    {
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN}`
      }
    }
  )

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}
