import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';


const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters:{
    layout: 'centered'
  },

  argTypes: {
    onSubmit: { action: 'submitted' }
  }
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
        isLoading: false,
        errorMessage: ''
    }
}

export const Loading: Story = {
    args: {
        isLoading: true,
        errorMessage: ''
    }
}

export const WithError: Story = {
    args: {
        isLoading: false,
        errorMessage: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
    }
}