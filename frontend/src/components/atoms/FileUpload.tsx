import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface FileUploadProps {
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  error?: string;
  value?: File[];
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  accept,
  multiple = false,
  maxSize = 10, // 10MB default
  maxFiles = 5,
  disabled = false,
  className,
  error,
  value = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files: File[]): { valid: File[]; error: string } => {
    let validFiles: File[] = [];
    let errorMsg = '';

    // Check number of files
    if (multiple && files.length + value.length > maxFiles) {
      errorMsg = `Maximum ${maxFiles} files allowed`;
      return { valid: [], error: errorMsg };
    }

    // Check file size
    for (const file of files) {
      if (file.size > maxSize * 1024 * 1024) {
        errorMsg = `File "${file.name}" exceeds ${maxSize}MB limit`;
        break;
      }
      validFiles.push(file);
    }

    return { valid: validFiles, error: errorMsg };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const { valid, error: validationError } = validateFiles(files);

    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError('');
    onChange(multiple ? [...value, ...valid] : valid);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const { valid, error: validationError } = validateFiles(files);

    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError('');
    onChange(multiple ? [...value, ...valid] : valid);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
    setUploadError('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const displayError = error || uploadError;

  return (
    <div className={cn('w-full', className)}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-[10px] p-[32px]',
          'flex flex-col items-center justify-center gap-[16px]',
          'transition-all cursor-pointer',
          isDragging && !disabled
            ? 'border-fill-brand-primary bg-fill-brand-primary/5'
            : 'border-stroke-base-secondary hover:border-stroke-base-primary',
          disabled && 'opacity-50 cursor-not-allowed',
          displayError && 'border-fill-error'
        )}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {/* Upload Icon */}
        <div
          className={cn(
            'w-[48px] h-[48px] rounded-full flex items-center justify-center',
            'bg-fill-base-secondary',
            isDragging && !disabled && 'bg-fill-brand-primary/10'
          )}
        >
          <svg
            className={cn(
              'w-[24px] h-[24px]',
              isDragging && !disabled ? 'text-fill-brand-primary' : 'text-text-base-secondary'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-text-base-primary text-[14px] font-[600] mb-[4px]">
            {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-text-base-tertiary text-[12px] font-[400]">
            {accept ? `Accepted formats: ${accept}` : 'Any file type'}
            {' • '}
            Max {maxSize}MB
            {multiple && ` • Up to ${maxFiles} files`}
          </p>
        </div>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {/* File List */}
      {value.length > 0 && (
        <div className="mt-[16px] space-y-[8px]">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={cn(
                'flex items-center gap-[12px] p-[12px]',
                'bg-fill-base-secondary rounded-[8px]',
                'border border-stroke-base-secondary'
              )}
            >
              {/* File Icon */}
              <div className="w-[32px] h-[32px] rounded-[6px] bg-fill-base-tertiary flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-[16px] h-[16px] text-text-base-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-text-base-primary text-[14px] font-[600] truncate">
                  {file.name}
                </p>
                <p className="text-text-base-tertiary text-[12px] font-[400]">
                  {formatFileSize(file.size)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                disabled={disabled}
                className={cn(
                  'w-[32px] h-[32px] rounded-[6px] flex items-center justify-center',
                  'text-text-base-secondary hover:text-fill-error hover:bg-fill-error/10',
                  'transition-colors',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {displayError && (
        <p className="mt-[8px] text-fill-error text-[12px] font-[400]">{displayError}</p>
      )}
    </div>
  );
};
