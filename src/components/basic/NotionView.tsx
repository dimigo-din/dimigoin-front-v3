import { BlockMapType, NotionRenderer } from 'react-notion';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "react-notion/src/styles.css";

export const NotionView = ({url}: {url: string}) => {
  const [content, setContent] = useState<BlockMapType>({});

  useEffect(() => {
    if(url) {
      const notionUid = url.split('/')[url.split('/').length-1];
      fetch(`https://notion-api.splitbee.io/v1/page/${notionUid}`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() =>  toast.error('노션 주소가 올바르지 않아요'));
    }
  }, [url]);

  return (
    <NotionRenderer
      blockMap={content}
    />
  );
}