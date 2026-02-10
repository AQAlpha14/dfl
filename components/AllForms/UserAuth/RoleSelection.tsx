"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { btnText } from "@/mockData/dummyData";
import Typography from "@/components/Typography";

type Role = { id: string; title: string; description?: string; icon?: string };

// --- Data (same as before) ---
const roles1: Role[] = [
  {
    id: "landlord",
    title: "I'm a Landlord",
    description: "I own rental properties",
    icon: "mdi:office-building-outline",
  },
  {
    id: "manager",
    title: "Rental Manager",
    description: "I manage properties",
    icon: "mdi:account-group-outline",
  },
  {
    id: "tenant",
    title: "I'm a Tenant",
    description: "Looking for a rental",
    icon: "mdi:home-outline",
  },
];

const roles2: Role[] = [
  {
    id: "expenses",
    title: "Track income & expenses",
    description: "I manage properties",
    icon: "mdi:office-building-outline",
  },
  {
    id: "property",
    title: "Market your property",
    description:
      "List your rental, reach more tenants, and simplify tenant screening.",
    icon: "mdi:account-group-outline",
  },
  {
    id: "exploring",
    title: "Just exploring",
    description:
      "Discover how our platform can save you time and maximize your returns.",
    icon: "mdi:home-outline",
  },
];

const property: Role[] = [
  { id: "studio", title: "Studio", icon: "mdi:office-building-outline" },
  { id: "1-bedroom", title: "1 Bedroom", icon: "mdi:account-group-outline" },
  { id: "2-bedrooms", title: "2 Bedrooms", icon: "mdi:home-outline" },
  {
    id: "3-bedrooms",
    title: "3 Bedrooms",
    icon: "mdi:office-building-outline",
  },
  {
    id: "4plus-bedrooms",
    title: "4+ Bedrooms",
    icon: "mdi:account-group-outline",
  },
  { id: "villa", title: "Villa", icon: "mdi:home-outline" },
];

const locations: Role[] = [
  { id: "dubai-marina", title: "Dubai Marina" },
  { id: "jbr", title: "JBR" },
  { id: "downtown", title: "Downtown Dubai" },
  { id: "business-bay", title: "Business Bay" },
  { id: "arabian-ranches", title: "Arabian Ranches" },
  { id: "jlt", title: "JLT" },
  { id: "palm-jumeirah", title: "Palm Jumeirah" },
  { id: "dubai-hills", title: "Dubai Hills" },
  { id: "city-walk", title: "City Walk" },
  { id: "difc", title: "DIFC" },
  { id: "mirdif", title: "Mirdif" },
  { id: "jumeirah-village-circle", title: "Jumeirah Village Circle" },
];

const budget: Role[] = [
  {
    id: "up-to-50000",
    title: "Up to 50,000 AED/year",
    icon: "mdi:office-building-outline",
  },
  {
    id: "50000-75000",
    title: "50,000 - 75,000 AED/year",
    icon: "mdi:account-group-outline",
  },
  {
    id: "75000-100000",
    title: "75,000 - 100,000 AED/year",
    icon: "mdi:home-outline",
  },
  { id: "100000-plus", title: "100,000+ AED/year", icon: "mdi:home-outline" },
];

// --- Component ---
export default function RoleSelectionMultiStep() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [properties, setProperties] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  // Validation for each step
  const isStepValid = () => {
    switch (step) {
      case 1:
        if (selectedRole === "landlord" || selectedRole === "manager") {
          return properties !== "";
        }
        return selectedRole !== "";
      case 2:
        return selectedRole !== ""; // role must be selected again
      case 3:
        return (
          selectedType !== "" &&
          selectedLocations.length > 0 &&
          selectedBudget !== ""
        );
      default:
        return false;
    }
  };
  // Handlers
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (roleId !== "landlord" && roleId !== "manager") setProperties("");
  };
  const handlePropertySelect = (id: string) => setSelectedType(id);
  const handleLocationToggle = (id: string) =>
    setSelectedLocations((prev) =>
      prev.includes(id) ? prev.filter((loc) => loc !== id) : [...prev, id],
    );
  const handleBudgetSelect = (id: string) => setSelectedBudget(id);
  const nextStep = () => {
    if (!isStepValid()) return; // stop if invalid
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  return (
    <section className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
      {/* Step 1 */}
      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography as="h3" size="lg" weight="semibold" className="pb-2">
            Tell Us About Yourself
          </Typography>
          <Typography as="p" size="sm">
            This helps us personalize your experience
          </Typography>
          <p className="text-sm font-medium text-gray-700 py-3">
            Choose Your Role <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {roles1.map((role) => {
              const active = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`relative bg-[#F3F3F5] py-6 px-4 rounded-xl border transition-all duration-200 ${
                    active
                      ? "border-primary bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-primaryLight hover:shadow-sm"
                  }`}
                >
                  {active && (
                    <div className="absolute right-4 top-4 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow">
                      <Icon icon="mdi:check" />
                    </div>
                  )}
                  <div className="flex flex-col text-left gap-4">
                    {role.icon && (
                      <div
                        className={`w-14 h-14 rounded-xl border shadow-sm flex items-center justify-center ${
                          active
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon icon={role.icon} className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <Typography
                        as="p"
                        size="sm"
                        weight="medium"
                        className="text-[14px]!"
                      >
                        {role.title}
                      </Typography>
                      {role.description && (
                        <p className="text-sm text-gray-500">
                          {role.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {(selectedRole === "landlord" || selectedRole === "manager") && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                How many properties do you have?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={properties}
                onChange={(e) => setProperties(e.target.value)}
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-3"
              >
                <option value="">Select number of properties</option>
                <option>1 Property</option>
                <option>2-5 Properties</option>
                <option>6-10 Properties</option>
                <option>11-20 Properties</option>
                <option>20+ Properties</option>
              </select>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={prevStep} variant="outline">
              <span className="flex items-center gap-2">
                <Icon icon="mdi:arrow-left" /> {btnText.back}
              </span>
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              icon2
            >
              {btnText.continue}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography as="h3" size="lg" weight="semibold" className="pb-2">
            What would you like to do first?
          </Typography>
          <Typography as="p" size="sm">
            Choose an action to get started
          </Typography>

          <div className="space-y-4 mb-6">
            {roles2.map((role) => {
              const active = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`relative w-full bg-[#F3F3F5] p-6 rounded-xl border transition-all duration-200 ${
                    active
                      ? "border-primary bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-primaryLight hover:shadow-sm"
                  }`}
                >
                  {active && (
                    <div className="absolute right-4 top-4 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow">
                      <Icon icon="mdi:check" />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {role.icon && (
                      <div
                        className={`w-14 h-14 rounded-xl border shadow-sm flex items-center justify-center ${
                          active
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon icon={role.icon} className="text-2xl" />
                      </div>
                    )}
                    <div className="text-left">
                      <Typography
                        as="p"
                        size="sm"
                        weight="medium"
                        className="text-[14px]!"
                      >
                        {role.title}
                      </Typography>
                      {role.description && (
                        <p className="text-sm text-gray-500">
                          {role.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={prevStep} variant="outline">
              <span className="flex items-center gap-2">
                <Icon icon="mdi:arrow-left" /> {btnText.back}
              </span>
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              icon2
            >
              {btnText.continue}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography as="h3" size="lg" weight="semibold" className="pb-2">
            Your preferences
          </Typography>
          <Typography as="p" size="sm">
            Help us find the perfect property for you
          </Typography>

          {/* Property Type */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Property Type <span className="text-red-500">*</span>
            </p>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {property.map((item) => {
                const active = selectedType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePropertySelect(item.id)}
                    className={`relative w-full hover:cursor-pointer text-left p-4 rounded-xl border transition-all duration-200 ${
                      active
                        ? "border-primary bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-primaryLight hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl border shadow-sm flex items-center justify-center ${
                          active
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon icon={item.icon!} className="text-2xl" />
                      </div>
                      <Typography
                        as="p"
                        size="sm"
                        weight="medium"
                        className="text-[14px]!"
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Preferred Locations <span className="text-red-500">*</span>
            </p>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {locations.map((item) => {
                const active = selectedLocations.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLocationToggle(item.id)}
                    className={`relative w-full hover:cursor-pointer text-left p-4 rounded-xl border transition-all duration-200 ${
                      active
                        ? "border-primary bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-primaryLight hover:shadow-sm"
                    }`}
                  >
                    <Typography
                      as="p"
                      size="sm"
                      weight="medium"
                      className="text-[14px]!"
                    >
                      {item.title}
                    </Typography>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Budget <span className="text-red-500">*</span>
            </p>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {budget.map((item) => {
                const active = selectedBudget === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleBudgetSelect(item.id)}
                    className={`relative w-full hover:cursor-pointer text-left p-4 rounded-xl border transition-all duration-200 ${
                      active
                        ? "border-primary bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-primaryLight hover:shadow-sm"
                    }`}
                  >
                    {active && (
                      <div className="absolute right-2 top-2 w-7 h-7 text-primary rounded-full flex items-center justify-center">
                        <Icon icon="mdi:check" />
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl border shadow-sm flex items-center justify-center ${
                          active
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon icon={item.icon!} className="text-2xl" />
                      </div>
                      <Typography
                        as="p"
                        size="sm"
                        weight="medium"
                        className="text-[14px]!"
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={prevStep} variant="outline">
              <span className="flex items-center gap-2">
                <Icon icon="mdi:arrow-left" /> {btnText.back}
              </span>
            </Button>
            <Button type="button" disabled={!isStepValid()} icon2>
              {btnText.continue}
            </Button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
