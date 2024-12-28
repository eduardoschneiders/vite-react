import { 
  BlockStack,
  Layout,
  Card,
  Text
} from '@shopify/polaris';

export default function Tags() {

  return (
    <BlockStack gap="500">
      <Layout>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  TAGS 🎉
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
      </Layout>
    </BlockStack>
  );
}