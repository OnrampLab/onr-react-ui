# `@onr/cloud-stream`

## Usage

### Example with Pusher

```javascript
import { CloudStream } from 'onr/cloud-stream';

const cloudStream = CloudStream.connect('pusher', {
  channel: 'myChannel',
  config: {
    appKey: 'test',
    cluster: 'test',
  },
});

cloudStream.getDefaultChannel()
  .bind('event1', event => {
    // ...
  })
  .bind('event2', event => {
    // ...
  });
```
