import { Logger } from 'winston';
import { Channel, ChannelModel, connect } from 'amqplib';
import { winstonLogger } from '@singh-barender/9-jobber-shared';

import { config } from '@auth/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: ChannelModel = await connect(config.RABBITMQ_ENDPOINT as string);
    const channel: Channel = await connection.createChannel();

    log.info('Auth server connected to queue successfully...');

    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'AuthService error createConnection() method:', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: ChannelModel): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
