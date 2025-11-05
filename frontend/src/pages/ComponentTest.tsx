import React, { useState } from 'react';
import {
  Select,
  MultiSelect,
  Checkbox,
  Tabs,
  TabPanel,
  Progress,
  CircularProgress,
  Tooltip,
  Radio,
  FileUpload,
  Button,
  Badge,
  Card,
  Input,
  Label,
} from '../components/atoms';

export const ComponentTest: React.FC = () => {
  // State for all components
  const [selectValue, setSelectValue] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [radioValue, setRadioValue] = useState('option1');
  const [files, setFiles] = useState<File[]>([]);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  ];

  const tabs = [
    { id: 'tab1', label: 'Overview', badge: '5' },
    { id: 'tab2', label: 'Details' },
    { id: 'tab3', label: 'Settings', disabled: false },
  ];

  const radioOptions = [
    { value: 'option1', label: 'Option 1', description: 'This is the first option' },
    { value: 'option2', label: 'Option 2', description: 'This is the second option' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="min-h-screen bg-fill-base-primary p-[32px]">
      <div className="max-w-[1200px] mx-auto space-y-[48px]">
        {/* Header */}
        <div>
          <h1 className="text-[32px] font-[700] text-text-base-primary mb-[8px]">
            Component Test Page
          </h1>
          <p className="text-[16px] text-text-base-secondary">
            Testing all atom components with Foqus design system
          </p>
        </div>

        {/* Select Component */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Select Component
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Dropdown with search functionality
              </p>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <Label>Basic Select</Label>
                <Select
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Select an option"
                />
                <p className="mt-[8px] text-[12px] text-text-base-tertiary">
                  Selected: {selectValue || 'None'}
                </p>
              </div>
              <div>
                <Label>Searchable Select</Label>
                <Select
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Search and select"
                  searchable
                />
              </div>
            </div>
          </div>
        </Card>

        {/* MultiSelect Component */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                MultiSelect Component
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Multi-select with chips display
              </p>
            </div>
            <div>
              <Label>Select Multiple Options</Label>
              <MultiSelect
                options={selectOptions}
                value={multiSelectValue}
                onChange={setMultiSelectValue}
                placeholder="Select multiple options"
              />
              <p className="mt-[8px] text-[12px] text-text-base-tertiary">
                Selected: {multiSelectValue.length} items
              </p>
            </div>
          </div>
        </Card>

        {/* Checkbox & Radio */}
        <Card>
          <div className="p-[24px] space-y-[24px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Checkbox & Radio Components
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Selection inputs
              </p>
            </div>
            <div className="grid grid-cols-2 gap-[24px]">
              <div>
                <Label>Checkbox</Label>
                <Checkbox
                  checked={checkboxValue}
                  onChange={setCheckboxValue}
                  label="I agree to the terms and conditions"
                />
              </div>
              <div>
                <Label>Radio Group</Label>
                <Radio
                  options={radioOptions}
                  value={radioValue}
                  onChange={setRadioValue}
                  name="test-radio"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Component */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Tabs Component
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Tab navigation with variants
              </p>
            </div>
            <div>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              <TabPanel tabId="tab1" activeTab={activeTab}>
                <p className="text-text-base-primary">Overview content goes here</p>
              </TabPanel>
              <TabPanel tabId="tab2" activeTab={activeTab}>
                <p className="text-text-base-primary">Details content goes here</p>
              </TabPanel>
              <TabPanel tabId="tab3" activeTab={activeTab}>
                <p className="text-text-base-primary">Settings content goes here</p>
              </TabPanel>
            </div>
            <div className="mt-[24px]">
              <Label>Pills Variant</Label>
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
            </div>
          </div>
        </Card>

        {/* Progress Component */}
        <Card>
          <div className="p-[24px] space-y-[24px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Progress Components
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Linear and circular progress bars
              </p>
            </div>
            <div className="space-y-[16px]">
              <div>
                <Label>Low Risk (25%)</Label>
                <Progress value={25} showLabel />
              </div>
              <div>
                <Label>Medium Risk (50%)</Label>
                <Progress value={50} showLabel />
              </div>
              <div>
                <Label>High Risk (75%)</Label>
                <Progress value={75} showLabel />
              </div>
              <div>
                <Label>Critical Risk (90%)</Label>
                <Progress value={90} showLabel />
              </div>
            </div>
            <div className="flex gap-[24px] items-center">
              <div>
                <Label>Circular Progress</Label>
                <CircularProgress value={65} size={100} />
              </div>
              <div>
                <Label>Success Variant</Label>
                <CircularProgress value={85} size={100} variant="success" />
              </div>
              <div>
                <Label>Error Variant</Label>
                <CircularProgress value={90} size={100} variant="error" />
              </div>
            </div>
          </div>
        </Card>

        {/* Tooltip Component */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Tooltip Component
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Hover tooltips with auto-positioning
              </p>
            </div>
            <div className="flex gap-[16px] flex-wrap">
              <Tooltip content="This is a top tooltip" position="top">
                <Button variant="secondary">Hover (Top)</Button>
              </Tooltip>
              <Tooltip content="This is a bottom tooltip" position="bottom">
                <Button variant="secondary">Hover (Bottom)</Button>
              </Tooltip>
              <Tooltip content="This is a left tooltip" position="left">
                <Button variant="secondary">Hover (Left)</Button>
              </Tooltip>
              <Tooltip content="This is a right tooltip" position="right">
                <Button variant="secondary">Hover (Right)</Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* FileUpload Component */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                FileUpload Component
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Drag and drop file upload
              </p>
            </div>
            <FileUpload
              onChange={setFiles}
              value={files}
              multiple
              maxSize={10}
              maxFiles={5}
              accept=".pdf,.doc,.docx,.png,.jpg"
            />
          </div>
        </Card>

        {/* Existing Components (for comparison) */}
        <Card>
          <div className="p-[24px] space-y-[16px]">
            <div>
              <h2 className="text-[20px] font-[600] text-text-base-primary mb-[4px]">
                Existing Components
              </h2>
              <p className="text-[14px] text-text-base-secondary">
                Previously created components
              </p>
            </div>
            <div className="flex gap-[16px] flex-wrap">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
            <div className="flex gap-[8px] flex-wrap">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <Label>Input Field</Label>
                <Input placeholder="Enter text here" />
              </div>
              <div>
                <Label>Input with Error</Label>
                <Input placeholder="Enter text" error="This field is required" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
