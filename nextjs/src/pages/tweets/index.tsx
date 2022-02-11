import * as React from 'react'
import {NextPage} from 'next'
import useSWR from 'swr'
import http from '../../utils/http'
import {Title} from '../../components/Title'
import {Tweet} from '../../components/Tweet'
import {Tweet as TweetModel} from '../../utils/models'

const fetcher = (url: string) => http.get(url).then((res) => res.data)

const CINCO_SEGUNDOS = 5000

const TweetsPage: NextPage = () => {
  const {data: tweets} = useSWR<Array<TweetModel>>('tweets', fetcher, {
    refreshInterval: CINCO_SEGUNDOS,
  })

  return (
    <div>
      <Title>Tweets</Title>
      {tweets?.map((tweet, key) => (
        <Tweet tweet={tweet} key={key} />
      ))}
    </div>
  )
}

export default TweetsPage
