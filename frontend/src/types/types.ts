export interface SourceInput {
  name: string;
  database_hostname: string;
  database_port: number | string;
  database_user: string;
  database_password: string;
  database_dbname: string;
  database_server_name: string;
  topics: string[];
}

export interface SourceCredentials {
  source_name: string;
  database_password: string;
}

export type SourceData = Omit<SourceInput, 'database_password' | 'topics'> & {
  slot_name: string;
  date_created: string;
}

export interface ConsumerData {
  name: string;
  description: string;
  tumbleweed_endpoint: string;
  kafka_client_id: string;
  kafka_broker_endpoints: string[];
  kafka_group_id: string;
  subscribed_topics: string[];
  received_message_count: number;
  date_created: string;
}

export type ConsumerInputDetails = Omit<ConsumerData, 'received_message_count' | 'date_created' | 'kafka_broker_endpoints' | 'tumbleweed_endpoint' | 'kafka_client_id'>;

export interface BooleanObject {
  [key: string]: boolean;
}

export interface ErrorBannerProps {
  message: string;
  handleCloseSnackbar: () => void;
  openStatus: boolean;
}

export interface SuccessSnackProps {
  message: string;
  handleCloseSnackbar: () => void;
  openStatus: boolean;
}

export interface TopicResponse {
  message: string,
  data: TopicData
}

export interface TopicData {
  topic: string,
  subscribed_consumers: string[],
  date_added: string
  message_count: number
}

export interface TopicsResponse {
  message: string,
  data: TopicData[]
}
