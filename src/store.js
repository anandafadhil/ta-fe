import { create } from 'zustand';

const useStore = create((set) => ({
    prodiID: null,
    predictResult: null,
    skst: null,
    ipk: null,
    sksNeeded: null,
    ketepatanWaktu: null,
    formData: {
        univInput: '',
        univInputID: '',
        prodiInput: '',
        prodiInputID: '',
    },
    formBulk: {
        univInput: '',
        univInputID: '',
        prodiInput: '',
        prodiInputID: '',
    },
    formDatass: {
        prodiInput: '',
        prodiInputLabel: '',
    },
    formDatas: {
        univInput: '',
        univInputLabel: '',
    },
    dataBulk: [],

    setProdiID: (id) => set({ prodiID: id }),
    setResult: (id) => set({ predictResult: id }),
    setSKST: (id) => set({ skst: id }),
    setIPK: (id) => set({ ipk: id }),
    setSKSNeeded: (id) => set({ sksNeeded: id }),
    setKetepatan: (id) => set({ ketepatanWaktu: id }),
    setFormBulk: (data) => set({ formBulk: data }),
    setDataBulk: (data) => set({ dataBulk: data }),
    setFormDatass: (data) => set({ formDatass: data }),
    setFormDatas: (data) => set({ formDatas: data }),
}));

export default useStore;
