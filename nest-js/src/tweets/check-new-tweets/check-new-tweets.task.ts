import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common'
import {Cache} from 'cache-manager'
import {Queue} from 'bull'
import {Interval} from '@nestjs/schedule'
import {TweetsService} from '../tweets.service'
import {InjectQueue} from '@nestjs/bull'

const TIME_IN_MILISECONDS = 5000
const TIME_IN_MINUTES = 1 * 60 * 10
const CACHE_KEY = 'tweets-offset'

@Injectable()
export class CheckNewTweetsTask {
  private limit = 10

  constructor(
    private tweetService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}

  @Interval(TIME_IN_MILISECONDS)
  async handle() {
    console.log('procurando tweets....')

    let offset = await this.cache.get<number>(CACHE_KEY)
    offset = !offset ? 0 : offset

    console.log(`offset: ${offset}`)

    const tweets = await this.tweetService.findAll({offset, limit: this.limit})

    console.log(`tweets count: ${tweets.length}`)

    if (tweets.length === this.limit) {
      console.log('achei mais tweets, vou continuar procurando...')

      await this.cache.set(CACHE_KEY, offset + this.limit, {
        ttl: TIME_IN_MINUTES,
      })

      this.emailsQueue.add({}) //kafka
    }
  }
}
