import { Page, Badge, LegacyCard, Layout, InlineStack, BlockStack, Divider, Text, Card, Button, Banner } from '@shopify/polaris';
import React from 'react';


export default function ShowProduct({ imageUrl, productName }) {
  const Placeholder = ({
    label = '',
    height = 'auto',
    width = 'auto',
    minHeight = 'auto',
    padding = '6px 0px',
    showBorder = false,
  }) => {
    return (
      <div
        style={{
          padding: padding,
          background: 'var(--p-color-text-info)',
          height: height,
          width: width,
          minHeight: minHeight,
          borderInlineStart: showBorder
            ? '1px dashed var(--p-color-bg-surface-success)'
            : 'none',
        }}
      >
        <InlineStack align="center">
          <div
            style={{
              color: 'var(--p-color-text-info-on-bg-fill)',
            }}
          >
            <Text
              as="h2"
              variant="bodyMd"
              fontWeight="medium"
              tone="text-inverse"
            >
              {label}
            </Text>
          </div>
        </InlineStack>
      </div>
    );
  };

  return (
    <Page
      fullWidth
      backAction={{ content: 'Products', url: '#' }}
      title={productName}
      titleMetadata={<Badge tone="critical" progress="complete">Preorder disabled</Badge>}
      primaryAction={{ content: 'Save' }}
      secondaryActions={
        [
          { content: 'View in Storefront' },
          { content: 'Edit in Shopify' },
          { content: 'Save for All Products' },
        ]}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard sectioned>
            <BlockStack gap="800">
              <InlineStack gap="400" blockAlign="center">
                <div style={{ width: '47px', height: '47px', padding: '5px', background: '#f9f9f7', border: 'solid 1px #e5e5e4', borderRadius: '8px' }}>
                  <img src={imageUrl} width={35} height={35} />
                </div>

                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                >
                  {productName}
                </Text>
              </InlineStack>
            </BlockStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <Card gap="400">
            <BlockStack gap="200">
              <BlockStack inlineAlign="start">
                <InlineStack gap="400">
                  <Text as="h3" variant="headingSm">
                    Status
                  </Text>
                </InlineStack>
              </BlockStack>
              <BlockStack>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p>
                    Preorder status is <strong>disabled</strong>
                  </p>

                  <Button variant="primary" tone="success">Enable</Button>
                </div>

                <Banner status="info">
                  <p style={{ textAlign: 'left' }}>
                    This product is currently not available for preorder. To enable preorder, click the button on the right.
                  </p>
                </Banner>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page >
  );
}