# @makemeachart

This twitter-bot, developed by Two-N, Inc., will respond to time-series data with a basic ASCII chart. An example response is: 

```
400| ＊　＊
200| 　　　　＊　　　＊
000| 　　　　　　　　　　＊
　　18￣￣￣￣￣￣￣￣￣￣13
```

### Tweet Requirements

In order to be readable for the bot, the data must be formatted with a year and a delimiter (such as ":" or "-") for each data point. The delimiter must be the same for each point. 
The bot can read data through a few methods:
* _Direct tweet with data_: the bot can respond to tweet that mention the username (@makemeachart) and include data in the format listed above
* _Quote another tweet with data_: the bot can parse and viz data from a quoted tweet. The tweet only needs to mention the username (@makemeachart) and quote the tweet with data. 
* _Reply to a tweet with data_: the bot can also respond to data from a reply. The tweet only needs to mention the username (@makemeachart) and reply to a tweet that includes data. 

Take a look at our twitter page to see some examples: https://twitter.com/makemeachart/with_replies

