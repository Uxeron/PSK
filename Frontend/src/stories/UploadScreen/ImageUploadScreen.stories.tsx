import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ImageUploadScreen } from '../../Screens/UploadScreen/ImageUploadScreen';

export default {
    title: 'UploadScreen/ImageUploadScreen',
    component: ImageUploadScreen,
} as Meta;

export const Default: Story = () => {
    return <ImageUploadScreen />
}