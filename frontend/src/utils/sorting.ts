import { ConsumerData, SourceData, TopicData } from "../types/types";

const parseDate = (dateStr: string): Date => {
  const cleanedStr = dateStr.replace(/(EST|PST|GMT|CST|UTC)/, '').trim().replace(" at", "");
  return new Date(cleanedStr);
};

export const sortConsumersByDate = (data: ConsumerData[]): ConsumerData[] => {
  return data.sort((a, b) => {
    const dateA = parseDate(a.date_created);
    const dateB = parseDate(b.date_created);
    return dateB.getTime() - dateA.getTime();
  });
};

export const sortSourcesByDate = (data: SourceData[]): SourceData[] => {
  return data.sort((a, b) => {
    const dateA = parseDate(a.date_created);
    const dateB = parseDate(b.date_created);
    return dateB.getTime() - dateA.getTime();
  });
};

export const sortTopicsByDate = (data: TopicData[]): TopicData[] => {
  return data.sort((a, b) => {
    const dateA = parseDate(a.date_added);
    const dateB = parseDate(b.date_added);
    return dateB.getTime() - dateA.getTime();
  });
};
