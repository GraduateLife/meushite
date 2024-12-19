import { Dialog, DialogTrigger } from '@/components/ui/dialog';
/**
 * @remarks: ContentComponent must wrap the DialogContent
 */
export const DialogWrapper = ({
  TriggerComponent,
  ContentComponent,
}: {
  TriggerComponent: React.ReactNode;
  ContentComponent: React.ReactNode;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>{TriggerComponent}</DialogTrigger>
        {ContentComponent}
      </Dialog>
    </>
  );
};
