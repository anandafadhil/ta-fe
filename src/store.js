import {create} from 'zustand';

const useStore = create((set) => ({
    univID: null,
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
    dataBulk: [],


    setUnivID: (id) => set({ univID: id }),
    setProdiID: (id) => set({ prodiID: id }),
    setResult: (id) => set({ predictResult: id }),
    setSKST: (id) => set({ skst: id }),
    setIPK: (id) => set({ ipk: id }),
    setSKSNeeded: (id) => set({ sksNeeded: id }),
    setKetepatan: (id) => set({ ketepatanWaktu: id }),
    setForm: (data) => set({ formData: data }),
    setFormBulk: (data) => set({ formBulk: data }),
    setDataBulk: (data) => set({ dataBulk: data}),
}));

export default useStore;
