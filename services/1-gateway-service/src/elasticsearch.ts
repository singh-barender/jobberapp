import { Logger } from 'winston';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { winstonLogger } from '@singh-barender/9-jobber-shared';

import { config } from '@gateway/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayElasticConnection', 'debug');

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      try {
        const health: ClusterHealthResponse = await this.elasticSearchClient.cluster.health({});
        log.info(`gatewayService Elasticsearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        log.error('Connection to Elasticsearch failed. Retrying in 5 seconds...');
        log.log('error', 'gatewayService checkConnection() method:', error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();
