import React from 'react';
import { EditorPlugin, IEditor, ImageEditor } from 'roosterjs-content-model-types';
import { createFloatingMenuProvider } from '../utils/createFloatingMenuProvider';
import {
  formatImageWithContentModel,
  setImageAltText,
  setImageBorder,
  setImageBoxShadow,
} from 'roosterjs-content-model-api';
import { iterateSelections, mutateBlock, updateImageMetadata } from 'roosterjs-content-model-dom';
import { FloatingMenuItemType } from '../types/FloatingMenu.type';
import { ImagePropertyPanel } from '../../../shared/components/imageproperty';

const MIN_WIDTH = 10;
const MIN_HEIGHT = 10;

function createOnClick(imageEditor?: ImageEditor) {
  return (key: string, editor: IEditor) => {
    const selection = editor.getDOMSelection();
    if (!selection || selection.type !== 'image') {
      return;
    }

    const image = selection.image;

    switch (key) {
      case 'menuNameImageSizeBestFit':
        resetImage(editor);
        break;
      case 'menuNameImageSizeSmall':
        resizeByPercentage(editor, 0.25, image.naturalWidth, image.naturalHeight);
        break;
      case 'menuNameImageSizeMedium':
        resizeByPercentage(editor, 0.5, image.naturalWidth, image.naturalHeight);
        break;
      case 'menuNameImageSizeOriginal':
        resizeByPercentage(editor, 1, image.naturalWidth, image.naturalHeight);
        break;
      case 'menuNameImageRotateLeft':
        imageEditor?.rotateImage(-Math.PI / 2);
        break;
      case 'menuNameImageRotateRight':
        imageEditor?.rotateImage(Math.PI / 2);
        break;
      case 'menuNameImageRotateFlipHorizontally':
        imageEditor?.flipImage('horizontal');
        break;
      case 'menuNameImageRotateFlipVertically':
        imageEditor?.flipImage('vertical');
        break;
      case 'menuNameImageCrop':
        imageEditor?.cropImage();
        break;
      case 'menuNameImageRemove':
        removeImage(editor);
        break;
      case 'menuNameImageCopy':
        editor.getDocument()?.execCommand('copy');
        break;
      case 'menuNameImageCut':
        editor.getDocument()?.execCommand('cut');
        break;
    }
  };
}

function createMenuItems(imageEditor?: ImageEditor): FloatingMenuItemType[] {
  const onClick = createOnClick(imageEditor);

  return [
    {
      key: 'menuNameImageAltText',
      type: 'modal',
      label: 'Add Alternate Text',
      icon: 'FaFont',
      modalTitle: 'Add Alternate Text',
      renderModalContent: (editor, onOk, onCancel) => (
        <ImageAltTextInput editor={editor} onOk={onOk} onCancel={onCancel} />
      ),
    },
    {
      key: 'divider-1',
      type: 'divider',
    },
    {
      key: 'menuNameImageResize',
      type: 'submenu',
      label: 'Size',
      icon: 'FaExpand',
      items: [
        {
          key: 'menuNameImageSizeBestFit',
          type: 'item',
          label: 'Best Fit',
          icon: 'FaCompress',
          onClick,
        },
        {
          key: 'menuNameImageSizeSmall',
          type: 'item',
          label: 'Small',
          icon: 'FaSearchMinus',
          onClick,
        },
        {
          key: 'menuNameImageSizeMedium',
          type: 'item',
          label: 'Medium',
          icon: 'FaSearchPlus',
          onClick,
        },
        {
          key: 'menuNameImageSizeOriginal',
          type: 'item',
          label: 'Original',
          icon: 'FaImage',
          onClick,
        },
      ],
    },
    {
      key: 'divider-2',
      type: 'divider',
    },
    {
      key: 'image-property',
      label: 'Image Properties',
      type: 'modal',
      icon: 'FaSlidersH',
      modalTitle: 'Image Properties',
      renderModalContent: (editor, onOk, onCancel) => (
        <ImageProperty editor={editor} onOk={onOk} onCancel={onCancel} />
      ),
    },
    {
      key: 'divider-3',
      type: 'divider',
    },
    {
      key: 'menuNameImageRotate',
      type: 'submenu',
      label: 'Rotate Image',
      icon: 'FaSyncAlt',
      items: [
        {
          key: 'menuNameImageRotateLeft',
          type: 'item',
          label: 'Left',
          icon: 'FaUndo',
          onClick,
        },
        {
          key: 'menuNameImageRotateRight',
          type: 'item',
          label: 'Right',
          icon: 'FaRedo',
          onClick,
        },
      ],
    },
    {
      key: 'menuNameImageFlip',
      type: 'submenu',
      label: 'Flip Image',
      icon: 'FaExchangeAlt',
      items: [
        {
          key: 'menuNameImageRotateFlipHorizontally',
          type: 'item',
          label: 'Flip Horizontally',
          icon: 'FaArrowsAltH',
          onClick,
        },
        {
          key: 'menuNameImageRotateFlipVertically',
          type: 'item',
          label: 'Flip Vertically',
          icon: 'FaArrowsAltV',
          onClick,
        },
      ],
    },
    {
      key: 'menuNameImageCrop',
      type: 'item',
      label: 'Crop Image',
      icon: 'FaCrop',
      onClick,
    },
    {
      key: 'divider-4',
      type: 'divider',
    },
    {
      key: 'menuNameImageCopy',
      type: 'item',
      label: 'Copy Image',
      icon: 'FaCopy',
      onClick,
    },
    {
      key: 'menuNameImageCut',
      type: 'item',
      label: 'Cut Image',
      icon: 'FaCut',
      onClick,
    },
    {
      key: 'divider-5',
      type: 'divider',
    },
    {
      key: 'menuNameImageRemove',
      type: 'item',
      label: 'Remove Image',
      icon: 'FaTrash',
      danger: true,
      onClick,
    },
  ];
}

function ImageAltTextInput({
  editor,
  onOk,
  onCancel,
}: {
  editor: IEditor;
  onOk: () => void;
  onCancel: () => void;
}) {
  const selection = editor.getDOMSelection();
  const image = selection?.type === 'image' ? (selection.image as HTMLImageElement) : null;
  const [altText, setAltText] = React.useState(image?.alt || '');

  const handleSave = () => {
    if (image) {
      editor.focus();
      editor.setDOMSelection({
        type: 'image',
        image: image,
      });
      setImageAltText(editor, altText);
    }
    onOk();
  };

  return (
    <div className='space-y-4'>
      <div>
        <label htmlFor='alt-text' className='block text-sm font-medium text-gray-700 mb-2'>
          Alternate Text
        </label>
        <input
          id='alt-text'
          type='text'
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter alternate text for the image'
          autoFocus
        />
      </div>
      <div className='flex justify-end gap-2'>
        <button
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
        >
          Save
        </button>
      </div>
    </div>
  );
}

function ImageProperty({
  editor,
  onOk,
  onCancel,
}: {
  editor: IEditor;
  onOk: () => void;
  onCancel: () => void;
}) {
  const selection = editor.getDOMSelection();
  const image = selection?.type === 'image' ? (selection.image as HTMLImageElement) : null;

  const initialProperties = image
    ? {
        borderColor: image.style.borderColor || 'hsl(0, 0%, 70%)',
        borderWidth: image.style.borderWidth || '1px',
        borderStyle: (image.style.borderStyle as any) || 'solid',
        boxShadow: image.style.boxShadow || '',
      }
    : undefined;

  return (
    <ImagePropertyPanel
      initialProperties={initialProperties}
      onSave={(property) => {
        const { borderColor, borderWidth, borderStyle, boxShadow } = property;

        // Apply border if width is not 0
        if (borderWidth && borderWidth !== '0px' && borderWidth !== '0') {
          setImageBorder(
            editor,
            {
              color: borderColor,
              width: borderWidth,
              style: borderStyle,
            },
            '5px'
          );
        } else {
          // Remove border
          setImageBorder(editor, null);
        }

        // Apply box shadow
        if (boxShadow) {
          setImageBoxShadow(editor, boxShadow, '4px');
        } else {
          setImageBoxShadow(editor, '', null);
        }

        onOk();
      }}
      onCancel={onCancel}
    />
  );
}

function shouldShowImageEditItems(editor: IEditor, _node: Node) {
  const selection = editor.getDOMSelection();
  return selection?.type === 'image' && !!selection.image;
}

function removeImage(editor: IEditor) {
  editor.formatContentModel(
    (model) => {
      let changed = false;

      iterateSelections(model, (_, __, block, segments) => {
        segments?.forEach((segment) => {
          if (segment.segmentType === 'Image' && block?.blockType === 'Paragraph') {
            const index = block.segments.indexOf(segment);

            if (index >= 0) {
              mutateBlock(block).segments.splice(index, 1);
              changed = true;
            }
          }
        });
      });

      return changed;
    },
    {
      apiName: 'DeleteImage',
    }
  );
}

function resizeByPercentage(
  editor: IEditor,
  percentage: number,
  naturalWidth: number,
  naturalHeight: number
) {
  formatImageWithContentModel(editor, 'resizeImage', (segment) => {
    updateImageMetadata(segment, (format) => {
      const validFormat = Object.assign(
        {
          naturalWidth,
          naturalHeight,
          leftPercent: 0,
          rightPercent: 0,
          topPercent: 0,
          bottomPercent: 0,
          angleRad: 0,
        },
        format
      );

      const newWidth = Math.max(
        MIN_WIDTH,
        validFormat.naturalWidth *
          (1 - validFormat.leftPercent - validFormat.rightPercent) *
          percentage
      );
      const newHeight = Math.max(
        MIN_HEIGHT,
        validFormat.naturalHeight *
          (1 - validFormat.topPercent - validFormat.bottomPercent) *
          percentage
      );
      validFormat.widthPx = newWidth;
      validFormat.heightPx = newHeight;
      segment.format.width = newWidth + 'px';
      segment.format.height = newHeight + 'px';

      return validFormat;
    });
  });
}

function resetImage(editor: IEditor) {
  formatImageWithContentModel(editor, 'resizeImage', (segment) => {
    updateImageMetadata(segment, () => null);

    delete segment.format.width;
    delete segment.format.height;

    segment.format.maxWidth = '100%';
  });
}

export function createImageEditMenuProvider(imageEditor?: ImageEditor): EditorPlugin {
  const menuItems = createMenuItems(imageEditor);

  return createFloatingMenuProvider('imageEdit', menuItems, shouldShowImageEditItems);
}
