import axios from 'axios'

export async function request(
  { query, variables, preview }: 
  { query: string, variables: Record<string, any>, preview: boolean }
) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables
    },
    {
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_DATOCMS_API_TOKEN}`
      }
    }
  )

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}
