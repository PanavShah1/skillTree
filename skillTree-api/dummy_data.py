class nodule: 
    def __init__(self, name, member) -> None:
        #member may also be of type nodule
        self.name = name
        self.member = member 
    def tellme(self):
        print(self.name, self.member.name)



C5 = nodule("C5", [[]])
C6 = nodule("C6", [[]])
C7 = nodule("C7", [[]])
C3 = nodule("C3", [[C5]])
C4 = nodule("C4", [[C6], [C7]])
C2 = nodule("C2", [[]])
C1 = nodule("C1", [[C2], [[C3], [C4]]])

