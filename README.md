# @makemeachart

This twitter-bot, developed by Two-N, Inc., will respond to time-series data with a basic ASCII chart. An example response is: 

```
400| ＊　＊
200| 　　　　＊　　　＊
000| 　　　　　　　　　　＊
　　18￣￣￣￣￣￣￣￣￣￣13
```

### Tweet Requirements

In order for the time series data to be readable for the bot, it must be formatted with a year and a delimiter (such as ":" or "-") for each data point. The delimiter must be the same for each point. 
The bot can read data through a few methods:
* __Direct tweet with data__: the bot can respond to tweet that mention the username (@makemeachart) and include data in the format listed above
* __Quote another tweet with data__: the bot can parse and viz data from a quoted tweet. The tweet only needs to mention the username (@makemeachart) and quote the tweet with data. 
* __Reply to a tweet with data__: the bot can also respond to data from a reply. The tweet only needs to mention the username (@makemeachart) and reply to a tweet that includes data. 

Take a look at our twitter page to see some examples: https://twitter.com/makemeachart/with_replies

