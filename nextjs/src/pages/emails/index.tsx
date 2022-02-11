import * as React from 'react'
import {NextPage} from 'next'
import useSWR from 'swr'
import http from '../../utils/http'
import {MailList} from '../../utils/models'
import {Title} from '../../components/Title'
import {Divider} from '../../components/Divider'
import {Button} from '../../components/Button'

const fetcher = (url: string) =>
  http.get<MailList>(url).then((res) => (!res.data ? [] : res.data.emails))

const EmaislPage: NextPage = () => {
  const {data} = useSWR<Array<string>>('mail-list', fetcher, {fallbackData: []})

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const emailsTextArea = document.getElementById(
      'emails',
    ) as HTMLTextAreaElement
    console.log(emailsTextArea.value.split('\n'))

    await http.post('mail-list', {emails: emailsTextArea.value.split('\n')})
  }

  return (
    <div>
      <Title>Emails</Title>
      <Divider className="mb-4 border-b" />
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <textarea
            id="emails"
            className="bg-default focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-black focus:outline-none dark:text-white"
            rows={10}
            placeholder="digite os emails separados por linha"
            defaultValue={data?.join('\n')}
          />
        </div>
        <Button>Salvar</Button>
      </form>
    </div>
  )
}

export default EmaislPage
