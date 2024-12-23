import React from 'react';
import { Page, Card } from '@shopify/polaris';

function NewComponent() {
  return (
    <Page title="Novo Componente">
      <Card sectioned>
        <p>Este é o novo componente acessível pela URL "/new".</p>
      </Card>
    </Page>
  );
}

export default NewComponent;