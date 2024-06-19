import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Button, Result } from 'antd';

export default function ErrorPage() {
  const error = useRouteError()
  // console.log('error:', error);
  switch (error.status) {
    case 404: 
      return (
        <div id="error-page">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><a href="/">Back Home</a></Button>}
            />
        </div>
      );
    case 403:
      return(
        <div id="error-page">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary"><a href="/">Back Home</a></Button>}
            />
        </div>
      );
    case 500:
      return(
        <div id="error-page">
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
              extra={<Button type="primary">Back Home</Button>}
            />
        </div>
      );
  }
  
}
