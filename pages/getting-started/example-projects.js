import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/getting-started/example-projects.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
