import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Select } from '../select';
import { Input } from '../input';
import { Button } from '../button';
import { ColorPicker } from '../colorpicker';
import {
  ImageProperty,
  ImagePropertyPanelProps,
  BorderStyle,
  BoxShadowOption,
} from './ImagePropertyPanel.types';
import { FaCheck, FaBorderNone } from 'react-icons/fa';
import { SYSTEM_COLORS } from '../../constants/MenuItems';

const BORDER_STYLES: BorderStyle[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'double', label: 'Double' },
  { value: 'groove', label: 'Groove' },
  { value: 'ridge', label: 'Ridge' },
  { value: 'inset', label: 'Inset' },
  { value: 'outset', label: 'Outset' },
];

const BOX_SHADOW_OPTIONS: BoxShadowOption[] = [
  { value: 'noShadow', label: 'No Shadow', shadow: '' },
  { value: 'bottomRight', label: 'Bottom Right', shadow: '4px 4px 3px #aaaaaa' },
  { value: 'bottom', label: 'Bottom', shadow: '0px 4px 3px 0px #aaaaaa' },
  { value: 'bottomLeft', label: 'Bottom Left', shadow: '-4px 4px 3px 3px #aaaaaa' },
  { value: 'right', label: 'Right', shadow: '4px 0px 3px 0px #aaaaaa' },
  { value: 'center', label: 'Center', shadow: '0px 0px 3px 3px #aaaaaa' },
  { value: 'left', label: 'Left', shadow: '-4px 0px 3px 0px #aaaaaa' },
  { value: 'topRight', label: 'Top Right', shadow: '4px -4px 3px 3px #aaaaaa' },
  { value: 'top', label: 'Top', shadow: '0px -4px 3px 0px #aaaaaa' },
  { value: 'topLeft', label: 'Top Left', shadow: '-4px -4px 3px 0px #aaaaaa' },
];

export const ImagePropertyPanel: React.FC<ImagePropertyPanelProps> = ({
  initialProperties = {},
  onSave: onSaveProp,
  onCancel: onCancelProp,
}) => {
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [properties, setProperties] = useState<ImageProperty>({
    borderStyle: 'solid',
    borderColor: 'hsl(0, 0%, 70%)',
    borderWidth: '1px',
    boxShadow: '',
    ...initialProperties,
  });

  const handlePropertyChange = (key: keyof ImageProperty, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomColorAdd = (color: string) => {
    setCustomColors((prev) => [...prev, color]);
  };

  const handleSave = () => {
    if (onSaveProp) {
      onSaveProp(properties);
    }
  };

  const handleCancel = () => {
    if (onCancelProp) {
      onCancelProp();
    }
  };

  const handleRemoveBorder = () => {
    setProperties((prev) => ({
      ...prev,
      borderWidth: '0px',
      borderStyle: 'solid',
    }));
  };

  const selectedShadow =
    BOX_SHADOW_OPTIONS.find((opt) => opt.shadow === properties.boxShadow)?.value || 'noShadow';

  return (
    <div className='max-w-2xl'>
      {/* Border Section */}
      <div className='mb-6 pb-6 border-b border-gray-200'>
        <h3 className='text-base font-semibold mb-4 text-gray-800'>Border</h3>
        <div className='grid grid-cols-12 gap-3 mb-3'>
          {/* Border Style */}
          <div className='col-span-4'>
            <Label.Root className='text-xs font-medium text-gray-700 block mb-1'>Style</Label.Root>
            <Select
              value={properties.borderStyle}
              onValueChange={(value) => handlePropertyChange('borderStyle', value)}
              options={BORDER_STYLES.map((style) => ({
                value: style.value,
                label: style.label,
              }))}
              placeholder='Select style'
              fullWidth
            />
          </div>

          {/* Border Color */}
          <div className='col-span-5'>
            <ColorPicker
              label='Color'
              value={properties.borderColor}
              onChange={(color) => handlePropertyChange('borderColor', color)}
              systemColors={SYSTEM_COLORS}
              customColors={customColors}
              onCustomColorAdd={handleCustomColorAdd}
              showColorText={true}
              fullWidth
            />
          </div>

          {/* Border Width */}
          <div className='col-span-3'>
            <Label.Root className='text-xs font-medium text-gray-700 block mb-1'>Width</Label.Root>
            <Input
              type='text'
              value={properties.borderWidth}
              onChange={(e) => handlePropertyChange('borderWidth', e.target.value)}
              placeholder='1px'
              fullWidth
            />
          </div>
        </div>

        {/* Remove Border Button */}
        <Button
          onClick={handleRemoveBorder}
          type='default'
          size='middle'
          icon={<FaBorderNone className='w-3.5 h-3.5' />}
          className='mt-1'
        >
          Remove Border
        </Button>
      </div>

      {/* Box Shadow Section */}
      <div className='mb-6'>
        <h3 className='text-base font-semibold mb-4 text-gray-800'>Box Shadow</h3>
        <div className='grid grid-cols-2 gap-2.5'>
          {BOX_SHADOW_OPTIONS.map((option) => {
            const isSelected = selectedShadow === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handlePropertyChange('boxShadow', option.shadow)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 transition-all
                  ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div
                  className='w-10 h-10 bg-white border border-gray-300 rounded shrink-0 shadow-sm'
                  style={{
                    boxShadow: option.shadow || 'none',
                  }}
                />
                <span
                  className={`text-sm font-medium ${
                    isSelected ? 'text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className='flex gap-3 pt-5 border-t border-gray-200'>
        <Button
          onClick={handleSave}
          type='primary'
          block
          icon={<FaCheck className='w-4 h-4' />}
          className='bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 focus:ring-green-500'
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          danger
          block
          icon={<span className='text-lg leading-none'>×</span>}
          className='bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
