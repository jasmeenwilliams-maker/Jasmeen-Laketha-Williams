/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation, ScreenTab } from './components/Navigation';
import { HandbookScreen } from './components/HandbookScreen';
import { CareHubScreen } from './components/CareHubScreen';
import { AppointmentPrepScreen } from './components/AppointmentPrepScreen';
import { MedicationSafetyScreen } from './components/MedicationSafetyScreen';
import { ResourceDirectoryScreen } from './components/ResourceDirectoryScreen';
import { BillingScreen } from './components/BillingScreen';
import { OperationsHubScreen } from './components/OperationsHubScreen';
import { ClientFormsPacketScreen } from './components/ClientFormsPacketScreen';
import { SOPManualScreen } from './components/SOPManualScreen';
import { SignatureModal } from './components/SignatureModal';
import { OnboardClientModal } from './components/OnboardClientModal';
import { 
  INITIAL_CLIENT_RECORDS,
  MOCK_RESOURCES 
} from './data/mockData';
import { ClientProfile, Appointment, MedicationItem, CoordinationLog, InvoiceItem, ClientRecord, FormsPacketData } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenTab>('handbook');
  const [clientRecords, setClientRecords] = useState<ClientRecord[]>(INITIAL_CLIENT_RECORDS);
  const [activeClientId, setActiveClientId] = useState<string>(INITIAL_CLIENT_RECORDS[0].client.id);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [selectedPrepAptId, setSelectedPrepAptId] = useState<string | undefined>(undefined);

  // Active client record and data slices
  const activeRecord = clientRecords.find((r) => r.client.id === activeClientId) || clientRecords[0];
  const client = activeRecord.client;
  const appointments = activeRecord.appointments;
  const medications = activeRecord.medications;
  const coordinationLogs = activeRecord.coordinationLogs;
  const invoices = activeRecord.invoices;

  const allClients = clientRecords.map((r) => r.client);

  const handleSelectClient = (clientId: string) => {
    setActiveClientId(clientId);
    setSelectedPrepAptId(undefined);
  };

  const handleAddClient = (newRecord: ClientRecord) => {
    setClientRecords((prev) => [newRecord, ...prev]);
    setActiveClientId(newRecord.client.id);
    setActiveScreen('handbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateClient = (updated: Partial<ClientProfile>) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? { ...rec, client: { ...rec.client, ...updated } }
          : rec
      )
    );
  };

  const handleUpdateClientById = (clientId: string, updated: Partial<ClientProfile>) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === clientId
          ? { ...rec, client: { ...rec.client, ...updated } }
          : rec
      )
    );
  };

  const handleDeleteClientById = (clientId: string) => {
    setClientRecords((prev) => {
      if (prev.length <= 1) return prev;
      const remaining = prev.filter((rec) => rec.client.id !== clientId);
      if (activeClientId === clientId && remaining.length > 0) {
        setActiveClientId(remaining[0].client.id);
      }
      return remaining;
    });
  };

  const handleSaveSignature = (
    signerName: string,
    roleTitle: string,
    date: string,
    signatureImage?: string
  ) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? {
              ...rec,
              client: {
                ...rec.client,
                acknowledgmentSigned: true,
                signerName: signerName,
                representativeName: roleTitle === 'Client' ? undefined : signerName,
                representativeRelation: roleTitle === 'Client' ? undefined : roleTitle,
                signatureDate: date,
                signatureDataUrl: signatureImage,
              },
            }
          : rec
      )
    );
  };

  const handleUpdateAppointment = (updated: Appointment) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? {
              ...rec,
              appointments: rec.appointments.map((a) => (a.id === updated.id ? updated : a)),
            }
          : rec
      )
    );
  };

  const handleAddLog = (newLog: CoordinationLog) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? { ...rec, coordinationLogs: [newLog, ...rec.coordinationLogs] }
          : rec
      )
    );
  };

  const handleUpdateMedication = (updated: MedicationItem) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? {
              ...rec,
              medications: rec.medications.map((m) => (m.id === updated.id ? updated : m)),
            }
          : rec
      )
    );
  };

  const handleAddMedication = (newItem: MedicationItem) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? { ...rec, medications: [newItem, ...rec.medications] }
          : rec
      )
    );
  };

  const handlePayInvoice = (invoiceId: string, paymentMethod: string) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? {
              ...rec,
              invoices: rec.invoices.map((inv) =>
                inv.id === invoiceId
                  ? { ...inv, status: 'paid' as const, paymentMethod }
                  : inv
              ),
            }
          : rec
      )
    );
  };

  const handleUpdateFormsPacket = (updatedPacket: FormsPacketData) => {
    setClientRecords((prev) =>
      prev.map((rec) =>
        rec.client.id === activeClientId
          ? { ...rec, formsPacket: updatedPacket }
          : rec
      )
    );
  };

  const handleNavigateToPrep = (aptId?: string) => {
    if (aptId) setSelectedPrepAptId(aptId);
    setActiveScreen('prep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F3] text-[#4A3B32] flex flex-col font-sans">
      
      {/* Top Navigation with Multi-Client Switcher */}
      <Navigation
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        client={client}
        allClients={allClients}
        onSelectClient={handleSelectClient}
        onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
        onOpenSignModal={() => setIsSignModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeScreen === 'handbook' && (
          <HandbookScreen
            client={client}
            allClients={allClients}
            onSelectClient={handleSelectClient}
            onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
            onUpdateClient={handleUpdateClient}
            onOpenSignModal={() => setIsSignModalOpen(true)}
            onNavigateToPrep={() => handleNavigateToPrep()}
            onNavigateToMedSafety={() => {
              setActiveScreen('meds');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToResources={() => {
              setActiveScreen('resources');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToBilling={() => {
              setActiveScreen('billing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'hub' && (
          <CareHubScreen
            client={client}
            allClients={allClients}
            onSelectClient={handleSelectClient}
            onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
            appointments={appointments}
            medications={medications}
            coordinationLogs={coordinationLogs}
            onAddLog={handleAddLog}
            onNavigateToPrep={handleNavigateToPrep}
            onNavigateToHandbook={() => {
              setActiveScreen('handbook');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMedSafety={() => {
              setActiveScreen('meds');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToForms={() => {
              setActiveScreen('forms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSOP={() => {
              setActiveScreen('sop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'operations' && (
          <OperationsHubScreen
            clientRecords={clientRecords}
            activeClientId={activeClientId}
            onSelectClient={handleSelectClient}
            onNavigateToScreen={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSignModalForClient={(clientId) => {
              setActiveClientId(clientId);
              setIsSignModalOpen(true);
            }}
            onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
            onUpdateMedication={(clientId, updatedMed) => {
              setClientRecords((prev) =>
                prev.map((rec) =>
                  rec.client.id === clientId
                    ? {
                        ...rec,
                        medications: rec.medications.map((m) =>
                          m.id === updatedMed.id ? updatedMed : m
                        ),
                      }
                    : rec
                )
              );
            }}
            onUpdateAppointment={(clientId, updatedApt) => {
              setClientRecords((prev) =>
                prev.map((rec) =>
                  rec.client.id === clientId
                    ? {
                        ...rec,
                        appointments: rec.appointments.map((a) =>
                          a.id === updatedApt.id ? updatedApt : a
                        ),
                      }
                    : rec
                )
              );
            }}
            onUpdateClient={handleUpdateClientById}
            onDeleteClient={handleDeleteClientById}
          />
        )}

        {activeScreen === 'forms' && (
          <ClientFormsPacketScreen
            clientRecord={activeRecord}
            allClients={allClients}
            onSelectClient={handleSelectClient}
            onUpdateFormsPacket={handleUpdateFormsPacket}
            onOpenSignModal={() => setIsSignModalOpen(true)}
            onNavigateToOperations={() => {
              setActiveScreen('operations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSOP={() => {
              setActiveScreen('sop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'sop' && (
          <SOPManualScreen
            onNavigateToScreen={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'prep' && (
          <AppointmentPrepScreen
            client={client}
            appointments={appointments}
            medications={medications}
            onUpdateAppointment={handleUpdateAppointment}
            selectedAptId={selectedPrepAptId}
          />
        )}

        {activeScreen === 'meds' && (
          <MedicationSafetyScreen
            client={client}
            medications={medications}
            onUpdateMedication={handleUpdateMedication}
            onAddMedication={handleAddMedication}
          />
        )}

        {activeScreen === 'resources' && (
          <ResourceDirectoryScreen
            client={client}
            resources={MOCK_RESOURCES}
          />
        )}

        {activeScreen === 'billing' && (
          <BillingScreen
            client={client}
            invoices={invoices}
            onPayInvoice={handlePayInvoice}
          />
        )}
      </div>

      {/* Interactive Signature Modal */}
      <SignatureModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSaveSignature={handleSaveSignature}
        initialSignerName={client.signerName || client.name}
      />

      {/* Onboard New Client Modal */}
      <OnboardClientModal
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        onAddClient={handleAddClient}
      />

    </div>
  );
}
