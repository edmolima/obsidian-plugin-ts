import React, { useState, useEffect } from 'react';
import type { PluginSettings } from '../../shared/lib/storage';
import { cn } from '../../shared/lib/utils';

interface SettingsViewProps {
  readonly getSettings: () => Readonly<PluginSettings>;
  readonly updateSettings: (partial: Partial<PluginSettings>) => Promise<void>;
}

export function SettingsView({
  getSettings,
  updateSettings
}: SettingsViewProps): React.ReactElement {
  const [settings, setSettings] = useState<PluginSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loaded = getSettings();
        setSettings(loaded as PluginSettings);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, [getSettings]);

  if (isLoading || !settings) {
    return (
      <div className={cn('op-p-4 op-text-gray-500')}>Loading settings...</div>
    );
  }

  const handleChange = async (
    field: keyof PluginSettings,
    value: string
  ): Promise<void> => {
    const updated = { ...settings, [field]: value };
    setSettings(updated);
    await updateSettings({ [field]: value });
  };

  return (
    <div className={cn('op-space-y-6')}>
      <div>
        <h2 className={cn('op-text-2xl op-font-bold op-mb-4')}>Plugin Settings</h2>
      </div>

      <div className={cn('op-space-y-4')}>
        <div className={cn('op-border-b op-pb-4')}>
          <div className={cn('op-mb-2')}>
            <div className={cn('op-font-semibold op-text-lg')}>
              Example Setting
            </div>
            <div className={cn('op-text-sm op-text-gray-600 op-mt-1')}>
              This is an example setting with Tailwind styling
            </div>
          </div>
          <input
            type="text"
            value={settings.exampleSetting}
            onChange={(e) => handleChange('exampleSetting', e.target.value)}
            className={cn(
              'op-w-full op-px-3 op-py-2 op-border op-rounded-md',
              'focus:op-outline-none focus:op-ring-2 focus:op-ring-blue-500'
            )}
          />
        </div>
      </div>
    </div>
  );
}
