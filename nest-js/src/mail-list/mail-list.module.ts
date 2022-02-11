import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ClientsModule, Transport, ClientKafka} from '@nestjs/microservices'
import {MailListService} from './mail-list.service'
import {MailListController} from './mail-list.controller'
import {MailList, MailListSchema} from './schemas/mail-list.schema'
import {SendMailTweetsJob} from './send-mail-tweets.job'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MailList.name,
        schema: MailListSchema,
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: process.env.KAFKA_CLIENT_ID,
              brokers: [process.env.KAFKA_HOST],
              ssl: process.env.KAFKA_USE_SSL === 'true',
              ...(process.env.KAFKA_SASL_USERNAME &&
                process.env.KAFKA_SASL_USERNAME !== '' &&
                process.env.KAFKA_SASL_PASSWORD &&
                process.env.KAFKA_SASL_PASSWORD !== '' && {
                  sasl: {
                    mechanism: 'plain',
                    username: process.env.KAFKA_SASL_USERNAME,
                    password: process.env.KAFKA_SASL_PASSWORD,
                  },
                }),
            },
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
          },
        }),
      },
    ]),
  ],
  controllers: [MailListController],
  providers: [
    MailListService,
    SendMailTweetsJob,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => kafkaService.connect(),
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class MailListModule {}
