import { Channel } from '@onr/cloud-stream/types/Channel';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamAdapter } from './StreamAdapter';
type Props = {
  children: JSX.Element;
  adapter: StreamAdapter;
};

type ChannelWrapper = {
  channel: Channel | null;
};

type StreamContextContract = {
  useSubscribe(channelName: string): ChannelWrapper;
};

const initialState: StreamContextContract = {
  useSubscribe: (_channelName: string) => {
    return { channel: null };
  },
};

export const StreamContext = createContext<StreamContextContract>(initialState);

export const useStreamContext = () => useContext(StreamContext);

export const StreamProvider: React.FC<Props> = ({ children, adapter }) => {
  const useSubscribe = (channelName: string) => {
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
      adapter.connect();
      setChannel(adapter.subscribe(channelName));

      return () => {
        adapter.unsubscribe(channelName);
      };
    }, [channelName]);

    return { channel };
  };

  return <StreamContext.Provider value={{ useSubscribe }}>{children}</StreamContext.Provider>;
};
