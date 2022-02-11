import Image from 'next/image'
import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt-PT.json'
import {Divider} from '../Divider'
import {Tweet as TweetModel} from '../../utils/models'

TimeAgo.addDefaultLocale(pt)
const timeAgo = new TimeAgo('pt-PT')

type Data = {
  tweet: TweetModel
}

type TweetProps = {
  tweet: TweetModel
}

export const Tweet: React.FunctionComponent<TweetProps> = (props) => {
  const {tweet} = props
  return (
    <>
      <Divider />
      <div className="flex p-4 pb-0">
        <div className="flex items-center">
          <div className="relative h-10 w-10">
            <Image
              className="rounded-full"
              src={tweet.User.BiggerProfileImageURLHttps}
              alt={tweet.User.Name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium leading-6 text-black dark:text-white">
              {tweet.User.Name}
            </p>
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
              @{tweet.User.ScreenName} . {timeAgo.format(tweet.CreatedAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="pl-16">
        <p className="text-black dark:text-white">{tweet.Text}</p>
      </div>
      <div className="mb-4" />
    </>
  )
}
