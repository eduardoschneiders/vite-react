import { Layout, LegacyCard, LegacyStack, useIndexResourceState, IndexTable, Link, Text, Badge, TextField, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import MainModal from './MainModal';
import { useState, useCallback } from 'react';


export default function AddProductModal({ onClose, products }) {
  const [searchValue, setSearchValue] = useState('');

  const filteredProducts = searchValue == '' ? products : products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(filteredProducts);

  const rowMarkupProducts = filteredProducts.map(
    ({ id, name, status, imageUrl, url, numberAvailable, price }, index) => (
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
          <div style={{ minWidth: "200px" }}>
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
          <div style={{ minWidth: "100px" }}>
            <Text as="span">
              {numberAvailable}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div style={{ minWidth: "100px" }}>
            <Text as="span">
              {price}
            </Text>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const resourceListForProducts = (
    <IndexTable
      resourceName={{ singular: 'product', plural: 'products' }}
      itemCount={filteredProducts.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={[
        { title: '' },
        { title: 'Name' },
        { title: 'Available' },
        { title: 'Price' },
      ]}
    >
      {rowMarkupProducts}
    </IndexTable>
  );

  return (
    <MainModal
      onClose={onClose}
      primaryAction={{
        content: 'Add',
        onAction: onClose,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}>
      <Layout>
        <Layout.Section>
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

            {resourceListForProducts}
          </LegacyCard>
        </Layout.Section>
      </Layout>

    </MainModal>
  );
}