import {
  Page,
  Badge,
  Checkbox,
  Image,
  IndexTable,
  LegacyCard,
  Layout,
  Bleed,
  Box,
  InlineStack,
  BlockStack,
  Text,
  Card,
  Button,
  Banner,
  DatePicker,
  TextField,
  Popover,
  Icon,
  Link,
  InlineGrid
} from '@shopify/polaris';
import { React, useState, useEffect, useRef } from 'react';
import { SearchIcon, CalendarIcon, InfoIcon } from '@shopify/polaris-icons';
import "./ShowProduct.css";


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

  const DatePickerForSync = () => {
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState('')
    const [{ month, year }, setDate] = useState({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });

    function handleOnClose({ relatedTarget }) {
      setVisible(false);
    }

    function handleMonthChange(month, year) {
      setDate({ month, year });
    }

    function handleDateSelection({ end: newSelectedDate }) {
      setSelectedDate(newSelectedDate);
      setCurrentDate(newSelectedDate.toISOString().slice(0, 10))
      setVisible(false);
    }

    useEffect(() => {
      if (selectedDate) {
        setDate({
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear(),
        });
      }
    }, [selectedDate]);
    return (
      <BlockStack gap="400">
        <Box minWidth='300px'>
          <Popover
            active={visible}
            autofocusTarget="none"
            preferredAlignment="left"
            fullWidth
            preferInputActivator={false}
            preferredPosition="below"
            preventCloseOnChildOverlayClick
            onClose={handleOnClose}
            activator={
              <div className='textFieldWrapper'>
                <TextField
                  role="combobox"
                  label="Start Date"
                  placeholder='Select new preorder launch date'
                  value={currentDate}
                  onFocus={() => setVisible(true)}
                  autoComplete="off"
                />
                <div className='icon'>
                  <Icon source={CalendarIcon} />
                </div>
              </div>
            }
          >
            <Card >
              <DatePicker
                month={month}
                year={year}
                selected={selectedDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
              />
            </Card>
          </Popover>
        </Box>
      </BlockStack>
    )
  }


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
      <BlockStack gap="500">
        <BlockStack gap="500">
          <Layout>
            <Layout.Section>
              <InlineGrid columns={['oneThird', 'twoThirds']}>
                <div>
                  <Card>
                    <BlockStack>
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
                  </Card>
                </div>

                <div className="main-content">
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
                  <Layout.Section>
                    <Card roundedAbove="sm">
                      <Bleed marginInline="400" marginBlock="400">
                        <Banner tone="info">
                          <strong>Product Settings</strong>
                        </Banner>

                        <Box padding="400">
                          <p style={{ textAlign: 'left' }}>
                            Default settings are automatically enabled. To choose custom settings (such as Button Text and Badge details), please check the box below.
                          </p>

                          <p style={{ textAlign: 'left', marginTop: '16px' }}>
                            <Checkbox label="Enable Custom Settings" />
                          </p>
                        </Box>
                      </Bleed>
                    </Card>
                  </Layout.Section>

                  <Layout.Section>
                    <Card gap="200">
                      <BlockStack gap="200">
                        <BlockStack inlineAlign="start">
                          <InlineStack gap="400">
                            <Text as="h3" variant="headingSm">
                              Product Inventory
                            </Text>
                          </InlineStack>
                        </BlockStack>
                        <BlockStack>

                          <p style={{ textAlign: 'left', marginTop: '16px' }}>
                            If the product inventory/details are incorrect, click <strong>"Sync Products"</strong> below.
                          </p>

                          <p style={{ textAlign: 'left', marginTop: '16px', marginBottom: '16px' }}>
                            <Button>Sync Products</Button>
                          </p>

                          <Card padding={0}>
                            <IndexTable
                              resourceName={{ singular: 'product', plural: 'products' }}
                              itemCount={2}
                              headings={[
                                { title: 'Product Location' },
                                { title: 'Inventory Tracking' },
                                { title: 'Inventory Quantity' },
                                { title: 'Oversell Status' },
                              ]}
                              selectable={false}
                            >
                              <IndexTable.Row id={1} key={1} position={1}>
                                <IndexTable.Cell>
                                  <p style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                    Pre-order Now App
                                  </p>
                                </IndexTable.Cell>
                                <IndexTable.Cell><Badge tone="success">Enabled</Badge></IndexTable.Cell>
                                <IndexTable.Cell>50</IndexTable.Cell>
                                <IndexTable.Cell><Badge tone="success">Enabled</Badge></IndexTable.Cell>
                              </IndexTable.Row>

                              <IndexTable.Row id={2} key={2} position={2}>
                                <IndexTable.Cell>
                                  <p style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                    Shopify
                                  </p>
                                </IndexTable.Cell>
                                <IndexTable.Cell><Badge tone="success">Enabled</Badge></IndexTable.Cell>
                                <IndexTable.Cell>50</IndexTable.Cell>
                                <IndexTable.Cell><Badge tone="success">Enabled</Badge></IndexTable.Cell>
                              </IndexTable.Row>
                            </IndexTable>
                          </Card>
                        </BlockStack>
                      </BlockStack>
                    </Card>
                  </Layout.Section>

                  <Layout.Section>
                    <Card gap="200">
                      <BlockStack gap="200">
                        <BlockStack inlineAlign="start">
                          <InlineStack gap="400">
                            <Text as="h3" variant="headingSm">
                              Launch Date Notification
                            </Text>
                          </InlineStack>
                        </BlockStack>
                        <BlockStack>
                          <p style={{ textAlign: 'left', marginTop: '16px', marginBottom: '16px' }}>
                            Enter your updated launch date and click "Send Email Alert" and we will email all users who have pre-ordered this product.
                          </p>


                          <InlineStack gap="400">
                            <DatePickerForSync />

                            <p style={{ textAlign: 'left', marginTop: '25px' }}>
                              <Button variant="primary">Sync Products</Button>
                            </p>
                          </InlineStack>

                          <div style={{ marginTop: '20px' }}>
                            <Banner tone="warning" status="info" style={{ marginTop: '20px' }}>
                              <p style={{ textAlign: 'left' }}>
                                <strong>NOTE:</strong> To prevent your emails being marked as spam, this action can only be done once every 72 hours.
                              </p>
                            </Banner>
                          </div>
                        </BlockStack>
                      </BlockStack>
                    </Card>
                  </Layout.Section>

                  <Layout.Section>
                    <div
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="primary" tone="critical" destructive>Delete Product</Button>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button>Save for all Products</Button>
                        <Button variant="primary">Save</Button>
                      </div>
                    </div>
                  </Layout.Section>

                </div>
              </InlineGrid>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </BlockStack>

      <Layout>
        <Layout.Section>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div
              style={{
                marginBottom: '1rem',
                width: '100%',
                maxWidth: '330px',
                marginTop: '30px'
              }}>
              <div className='visit-support-center'>
                <Card roundedAbove="sm">
                  <InlineStack wrap={true} gap="200">
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        gap: '10px'
                      }}>
                      <Button
                        size="medium"
                        onClick={() => { }}
                        accessibilityLabel="Visit support center"
                        variant="plain"
                        icon={InfoIcon}
                      />
                      <div
                        style={{
                          height: '100%',
                          width: 'auto',
                          paddingTop: '5px'
                        }}>
                        <Text as="p" variant="bodyMd">
                          Need our help? Visit our                         <Link monochrome url="https://help.shopify.com/manual">
                            support center.
                          </Link>
                        </Text>

                      </div>
                    </div>
                  </InlineStack>
                </Card>
              </div>
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </Page >
  );
}