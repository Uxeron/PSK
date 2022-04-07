import React from 'react';
import { Meta, Story } from '@storybook/react';
import { UploadConfirmationScreen } from '../../Screens/UploadScreen/UploadConfirmationScreen';

export default {
    title: 'UploadScreen/UploadConfirmationScreen',
    component: UploadConfirmationScreen,
} as Meta;

export const Default: Story = () => {
    return <UploadConfirmationScreen />
}