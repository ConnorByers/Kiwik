export const isTrendingTopicInState = (trendingTopics, topic) => {
    return trendingTopics.some((trendingTopic) => {
        return topic == trendingTopic[0];
    });
}

export const getTrendingTopicIds = (state, topic) => {
    return state.tweet.trendingWords.filter((trendingTopic) => {
        return topic == trendingTopic[0];
    })[0][1][1];
};