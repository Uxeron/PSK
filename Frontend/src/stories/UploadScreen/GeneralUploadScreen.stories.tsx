import React from 'react';
import { Meta, Story } from '@storybook/react';
import { GeneralUploadScreen } from '../../Screens/UploadScreen/GeneralUploadScreen';

export default {
    title: 'UploadScreen/GeneralUpload',
    component: GeneralUploadScreen,
} as Meta;

export const Default: Story = () => {
    return <GeneralUploadScreen />
}