import { Modal } from '@shopify/polaris';

export default function MainModal({ title, onClose, primaryAction, secondaryActions, children }) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      title={title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Modal.Section>
        {children}
      </Modal.Section>
    </Modal>
  );
}