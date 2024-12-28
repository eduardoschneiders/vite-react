import { Page, Card, Text, BlockStack } from '@shopify/polaris';
import { ExportIcon, PlusIcon } from '@shopify/polaris-icons';
import React from 'react';

export default function NewComponent({ foo, products }) {
  console.log(foo);
  console.log(products);
  return (
    <Page
      fullWidth
      title="Orders"

      pagination={{
        hasNext: true,
      }}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card {foo}
            {/* {products} */}
            {products.map((product, index) => (
              <Text as="p" variant="bodyMd" key={index}>
                {product.name}
              </Text>
            ))}
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information saf sadf sdf asdf sadf asd fasdf asf asdf as asgsd asdf asd sdf asd fsa fasf asfasd sa asdf asdf asdf sfdsdf sdf fgs dfgsdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg
          </Text>
      </BlockStack>
      </Card>
    </Page>
  );
}