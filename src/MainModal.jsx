import { Modal } from '@shopify/polaris';

export default function MainModal({ onClose, primaryAction, secondaryActions, children }) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title="Export customers"
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Modal.Section>
        {children}
      </Modal.Section>
    </Modal>
  );
}