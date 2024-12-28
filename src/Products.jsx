import {
  Page,
  BlockStack,
  Button,
  ButtonGroup,
  Layout,
  Card,
  InlineStack,
  List,
  Text,
  Link,
  Tabs,
  ResourceList,
  ResourceItem,
  Badge,
  TextField,
  Avatar,
  IndexTable,
  useIndexResourceState,
  EmptyState,
  Icon,
  LegacyCard
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';

import Tags from './Tags.jsx'
import AddProductModal from './AddProductModal.jsx'
import { useState, useCallback } from 'react';
import noResults from './assets/no_results.svg'

export default function Products(props) {
  const { shop, products, tags, baseUrl, productsToAdd } = props;
  const [selected, setSelected] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedItemsTags, setSelectedItemsTags] = useState([]);
  const [selectedItemsProducts, setSelectedItemsProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const filteredProducts = searchValue == '' ? products : products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredTags = searchValue == '' ? tags : tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(selected == 0 ? filteredProducts : filteredTags);

  const rowMarkupProducts = filteredProducts.map(
    ({ id, name, status, imageUrl, url }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <div style={{ width: '47px', height: '47px', padding: '5px', background: '#f9f9f7', border: 'solid 1px #e5e5e4', borderRadius: '8px' }}>
            <img src={imageUrl} width={35} height={35} />
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div style={{ width: "450px" }}>
            <Link
              dataPrimaryLink
              url={url}
              onClick={() => console.log(`Clicked ${name}`)}
            >
              <Text as="span">
                {name}
              </Text>
            </Link>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div style={{ width: "330px" }}>
            <Badge tone={status.toLowerCase() === 'enabled' ? 'success' : 'critical'}>
              <div style={{ textTransform: 'capitalize' }}>
                {status}
              </div>
            </Badge>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const rowMarkupTags = filteredTags.map(
    ({ id, name, status, url }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <div style={{ width: "450px" }}>
            <Link
              dataPrimaryLink
              url={url}
              onClick={() => console.log(`Clicked ${name}`)}
            >
              <Text as="span">
                {name}
              </Text>
            </Link>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div style={{ width: "330px", marginTop: '7px', marginBottom: '7px' }}>
            <Badge tone={status.toLowerCase() === 'enabled' ? 'success' : 'critical'}>
              <div style={{ textTransform: 'capitalize' }}>
                {status}
              </div>
            </Badge>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const emptyStateMarkupForProducts = (
    <EmptyState
      action={{
        content: 'Add Preorder Product',
        onAction: () => setShowAddProductModal(true)
      }}
    >
      <img style={{ marginBottom: '15px' }} src={noResults} />
      <Text variant="headingMd" as="h6">
        No Preorder Products Yet.
      </Text>

      <Text style={{ marginBottom: '15px' }} variant="headingMd" as="h6">
        Let’s Add Your First!
      </Text>

      <p style={{ marginTop: '15px' }}>Start by adding and enabling preorder products to offer early access to your customers.</p>
    </EmptyState>
  );

  const resourceListForProducts = (
    <IndexTable
      resourceName={{ singular: 'product', plural: 'products' }}
      itemCount={filteredProducts.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      emptyState={emptyStateMarkupForProducts}
      onSelectionChange={handleSelectionChange}
      headings={[
        { title: '' },
        { title: 'Product' },
        { title: 'Preorder Status' },
      ]}
      promotedBulkActions={
        [
          {
            content: 'Delete from Preorders',
            onAction: () => console.log('Todo: implement delete'),
          },
          {
            content: 'Enable preorder',
            onAction: () => console.log('Todo: implement enable'),
          },
          {
            content: 'Disable preorder',
            onAction: () => console.log('Todo: implement disable'),
          }
        ]
      }
    >
      {rowMarkupProducts}
    </IndexTable>
  );


  const resourceListForTags = (
    <IndexTable
      resourceName={{ singular: 'tag', plural: 'tags' }}
      itemCount={filteredTags.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      emptyState={emptyStateMarkupForProducts}
      onSelectionChange={handleSelectionChange}
      headings={[
        { title: 'Tag Name' },
        { title: 'Preorder Status' },
      ]}
      promotedBulkActions={
        [
          {
            content: 'Delete from Preorders',
            onAction: () => console.log('Todo: implement delete'),
          },
          {
            content: 'Enable preorder',
            onAction: () => console.log('Todo: implement enable'),
          }
        ]
      }
    >
      {rowMarkupTags}
    </IndexTable>
  );

  const tabs = [
    {
      id: 'products-tab',
      content: 'Preorder Products',
      accessibilityLabel: 'All products',
      panelID: 'products-tab',
    },
    {
      id: 'tags-tab',
      content: 'Preorder Tags',
      panelID: 'tags-tab',
    },
  ]

  return (
    <Page title="Preorders" primaryAction={<Button variant="primary">Add Preorder {selected == 0 ? 'Product' : 'Tag'}</Button>}>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard>
                <div style={{ padding: '8px', marginTop: '10px' }}>
                  <TextField
                    placeholder="Search in Products"
                    value={searchValue}
                    onChange={handleSearchChange}
                    fullWidth
                    prefix={
                      <Icon source={SearchIcon} />
                    }
                  />
                </div>

                <hr style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#E3E3E3', marginTop: '0', marginBottom: '0' }} />

                {tabs[selected].id == 'products-tab' &&
                  resourceListForProducts
                }

                {tabs[selected].id == 'tags-tab' &&
                  resourceListForTags
                }
              </LegacyCard>
            </Tabs>

            {showAddProductModal &&
              <AddProductModal products={productsToAdd} onClose={() => { setShowAddProductModal(false) }} />}


          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This embedded app template uses{" "}
                    <Link
                      url="https://shopify.dev/docs/apps/tools/app-bridge"
                      target="_blank"
                      removeUnderline
                    >
                      App Bridge
                    </Link>{" "}
                    interface examples like an{" "}
                    <Link url="/app/additional" removeUnderline>
                      additional page in the app nav
                    </Link>
                    , as well as an{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql"
                      target="_blank"
                      removeUnderline
                    >
                      Admin GraphQL
                    </Link>{" "}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Get started with products
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Generate a product with GraphQL and get the JSON output for
                    that product. Learn more about the{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                      target="_blank"
                      removeUnderline
                    >
                      productCreate
                    </Link>{" "}
                    mutation in our API references.
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Tags />
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}