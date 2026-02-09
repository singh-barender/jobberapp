import amqp from 'amqplib';

import * as connection from '@notifications/queues/connection';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

jest.mock('amqplib');
jest.mock('@notifications/queues/connection');
jest.mock('@singh-barender/9-jobber-shared');

describe('Email Consumer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consumeAuthEmailMessages method', () => {
    it('should be called', async () => {
      const channel: Partial<amqp.Channel> = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn().mockReturnValue({ queue: 'auth-email-queue', messageCount: 0, consumerCount: 0 }),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };

      jest.spyOn(connection, 'createConnection').mockResolvedValue(channel as amqp.Channel);

      const connectionChannel: amqp.Channel | undefined = await connection.createConnection();
      await consumeAuthEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('jobber-email-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'jobber-email-notification', 'auth-email');
    });
  });

  describe('consumeOrderEmailMessages method', () => {
    it('should be called', async () => {
      const channel: Partial<amqp.Channel> = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn().mockReturnValue({ queue: 'order-email-queue', messageCount: 0, consumerCount: 0 }),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };

      jest.spyOn(connection, 'createConnection').mockResolvedValue(channel as amqp.Channel);

      const connectionChannel: amqp.Channel | undefined = await connection.createConnection();
      await consumeOrderEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('jobber-order-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('order-email-queue', 'jobber-order-notification', 'order-email');
    });
  });
});
